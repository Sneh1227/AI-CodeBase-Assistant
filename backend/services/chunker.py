import re


def chunk_code(code_files):

    chunks = []

    for file in code_files:

        content = file["content"]

        split_chunks = re.split(r'\ndef ', content)

        for i, chunk in enumerate(split_chunks):

            if i != 0:
                chunk = "def " + chunk

            chunk_data = {
                "file_name": file["file_name"],
                "path": file["path"],
                "chunk": chunk.strip()
            }

            chunks.append(chunk_data)

    return chunks