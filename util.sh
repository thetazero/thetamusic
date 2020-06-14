# rename
for f in *mp3; do
    mv -- "$f" "${f/absoluteword/}"; 
done

# donwload yt-playlist mp3
youtube-dl --extract-audio --audio-format mp3 -o "%(title)s.%(ext)s" <playlist>