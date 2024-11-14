https://god48.com/create-ssh

ssh-keygen -t rsa -C jirotakahashi.work@gmail.com

https://note.com/bluecode_inc/n/n3f67774c8642



#個人用仕事アカウント
Host github-priv
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_priv #鍵のファイルの名前
  User git



function githubpriv() {
  git config --global user.name "jaonkeller"
  git config --global user.email "	jirotakah
  ashi.work@gmail.com"
}



git remote rm origin
git remote -v


echo "# pf-2-html" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jaonkeller/pf-2-html.git
git push -u origin main



git config --local user.email "	jirotakahashi.work@gmail.com"
git config --local user.name "jaonkeller"