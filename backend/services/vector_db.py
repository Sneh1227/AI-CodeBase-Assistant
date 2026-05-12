import chromadb

client = chromadb.Client()

def get_collection(collection_name):

    collection = client.get_or_create_collection(
        name=collection_name
    )

    return collection


def store_embeddings(embedded_chunks, collection_name):

    collection = get_collection(collection_name)

    for index, item in enumerate(embedded_chunks):
        # print(item)
        collection.add(
            ids=[str(index)],
            embeddings=[item["embedding"]],
            documents=[item["chunk"]]
        )

    return "Embeddings stored successfully"

def search_similar_chunks(query_embedding, collection_name):

    collection = get_collection(collection_name)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return results