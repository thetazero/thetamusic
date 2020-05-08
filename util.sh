for f in *mp3; do
    mv -- "$f" "${f/absoluteword/}"; 
done
