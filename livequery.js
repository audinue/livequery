function liveQuery (selector, callback) {
    var cleanUps = new WeakMap()
    var add = function (node) {
        if (!cleanUps.has(node)) {
            var cleanUp = callback(node)
            if (typeof cleanUp === 'function') {
                cleanUps.set(node, cleanUp)
            }
        }
    }
    var remove = function (node) {
        var cleanUp = cleanUps.get(node)
        if (cleanUp) {
            cleanUps.delete(node)
            cleanUp()
        }
    }
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.matches) {
                    node.querySelectorAll(selector).forEach(add)
                    if (node.matches(selector)) {
                        add(node)
                    }
                }
            })
            mutation.removedNodes.forEach(function (node) {
                if (node.matches) {
                    node.querySelectorAll(selector).forEach(remove)
                    if (node.matches(selector)) {
                        remove(node)
                    }
                }
            })
        })
    })
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    })
    document.querySelectorAll(selector).forEach(add)
}
