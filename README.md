# livequery

```html
<script src="https://cdn.jsdelivr.net/gh/audinue/livequery@1.0/livequery.js"></script>

<script>
liveQuery('div', div => {
    div.onclick = () => div.remove()
    console.log('div added')
    return () => console.log('div removed')
})
</script>

<div>Hello world!</div>
<div>Hello world!</div>
<div>Hello world!</div>
```
