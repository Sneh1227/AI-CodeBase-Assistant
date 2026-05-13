import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY")
)


def generate_response(query, retrieved_chunks):

    context = ""

    documents = retrieved_chunks["documents"][0]

    for doc in documents:
        context += doc + "\n\n"

    prompt = f"""
You are an AI Codebase Assistant.

Answer the user's question ONLY using the provided code context.

CODE CONTEXT:
{context}

USER QUESTION:
{query}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content