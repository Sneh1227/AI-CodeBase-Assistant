import os

SUPPORTED_EXTENSIONS = [".py", ".js", ".java", ".ts"]


def read_code_files(folder_path):
    code_files = []

    for root, dirs, files in os.walk(folder_path):

        for file in files:

            file_extension = os.path.splitext(file)[1]

            if file_extension in SUPPORTED_EXTENSIONS:

                full_path = os.path.join(root, file)

                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        content = f.read()

                    code_files.append({
                        "file_name": file,
                        "path": full_path,
                        "content": content
                    })

                except Exception as e:
                    print(f"Error reading {file}: {e}")

    return code_files