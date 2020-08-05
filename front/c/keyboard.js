document.addEventListener('keydown', ({ key, ctrlKey }) => {
    if (ctrlKey && navElem.open) {
        if (key == 'j') {
            navElem.selectIndex++
        } else if (key == 'k') {
            navElem.selectIndex--
        }
    } else if (ctrlKey && !navElem.open) {
        if (key == '/') {
            navElem.searchElem.focus()
        } else if (listElem.queue.length > 0) {
            if (key == 'j') {
                listElem.index++
            } else if (key == 'k') {
                listElem.index--
            } else if (key == ' ') {
                listElem.toggle()
            }
        }
        console.log(key, key == ' ')
    }
})