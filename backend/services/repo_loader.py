import os
import shutil
import stat
from git import Repo


REPO_BASE_PATH = "repositories"


def remove_readonly(func, path, _):
    os.chmod(path, stat.S_IWRITE)
    func(path)


def clone_github_repo(repo_url):

    if not os.path.exists(REPO_BASE_PATH):
        os.makedirs(REPO_BASE_PATH)

    repo_name = repo_url.rstrip("/").split("/")[-1]

    local_path = os.path.join(REPO_BASE_PATH, repo_name)

    # delete old repo safely
    if os.path.exists(local_path):
        shutil.rmtree(local_path, onerror=remove_readonly)

    Repo.clone_from(repo_url, local_path)

    return local_path