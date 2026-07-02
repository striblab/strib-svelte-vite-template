<script>
    /** @type {{ count: number; handleIncrement?: (event: MouseEvent) => void; handleDecrement?: (event: MouseEvent) => void }} */
    let {
        count = 0,
        handleIncrement = () => {},
        handleDecrement = () => {},
    } = $props();
</script>

<div class="text-center">
    <h2>{count}</h2>
    <div class="flex flex-row gap-2 w-fit mx-auto">
        <button
            class="border-2 rounded-2xl w-20 border-border-strong-01 cursor-pointer"
            onclick={handleIncrement}>+</button
        >
        <button
            class="border-2 rounded-2xl w-20 border-border-strong-01 cursor-pointer"
            onclick={handleDecrement}>—</button
        >
    </div>
</div>
