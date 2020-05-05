<script>
    export let name = "enc-type";
    export let options = ["AES-128", "Caesar", "Triple-DES"];
    export let selected = "AES-128";
    export let onUpdate = (value) => {};

    $: onUpdate(selected);
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
