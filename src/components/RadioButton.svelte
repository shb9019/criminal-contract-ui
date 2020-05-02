<script>
    export let name = "enc-type";
    export let options = ["AES-128", "Caesar", "Triple-DES"];

    let selected = options[0];
    $: console.log('Changed selected:', selected)

</script>

{#each options as value}
    <input type="radio" id={value} name={name} {value} bind:group={selected}>
    <label for={value} class={selected === value ? "active-label" : ""}>{value}</label><br>
{/each}

<style>
    input[type="radio"] {
        display: none;
    }
    label {
        font-family: 'Roboto Mono', monospace;
        color: #98aea7;
        padding: 10px 25px;
        background-color: #2b2b2b;
        cursor: pointer;
    }

    label:hover, .active-label {
        background-color: #343637;
        font-weight: 800;
    }
</style>
