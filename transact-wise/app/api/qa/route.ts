// pages/api/qa.js
import { NextRequest, NextResponse } from "next/server"; // Import json from next/server
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import type { NextApiRequest, NextApiResponse } from 'next';

interface SplitDocument {
  text: string;
  // other properties...
}


// Your initialization logic can be shared
const loader = new CSVLoader("/workspaces/TransactWise/transact-wise/public/Sample_Full_Transactions_Positive.csv"); // Use CSVLoader instead of CheerioWebBaseLoader
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
const model = new ChatOpenAI({ modelName: "gpt-4" });

export async function POST(req: NextRequest, res: NextResponse ) { // Export your function as the default export
  try {
    const data = await loader.load(); // Load the CSV data
    const splitDocs = await textSplitter.splitDocuments(data);
    // Get the texts from the splitDocs
    const texts = splitDocs;

    // Get the embeddings from the OpenAI API
    const embeddings = new OpenAIEmbeddings(); // Use get_embeddings function

    // Embeddings and Vector Store
    const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

    // Retrieval QA Chain
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    console.log(req.body);
    
    const body = await req.json() // Parse req.body as JSON
    const { question } = body; // Destructure question from body
    console.log(question); // Log the question variable
    const response = await chain.call({ query: question });
    console.log(response); // Log the response variable
    return NextResponse.json(response); // Use NextResponse.json() instead of res.json()
  } catch (error) {
    console.error('Error:', error); // Log the error
    return NextResponse.json({ error: 'Internal Server Error' }); // Use NextResponse.status() instead of res.status()
  }
}

// You can add more functions for other HTTP methods if needed
