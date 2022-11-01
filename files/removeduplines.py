
readFile = "skyTextPoem.txt"
writeFile = "skyTextPoem_RD.txt"

lines_seen = set() # holds lines already seen
outfile = open(writeFile, "w", encoding="utf-8")
for line in open(readFile, "r", encoding="utf-8"):
    if line not in lines_seen: # not a duplicate
        outfile.write(line)
        lines_seen.add(line)
outfile.close()