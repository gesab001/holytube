import subprocess

command = "git add . && git commit -m 'update' && git push --all && ng deploy --base-href=/holytube/"
subprocess.call(command, shell=True)




