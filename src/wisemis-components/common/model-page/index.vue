<template>
    <d2-container>
        <slot></slot>
    </d2-container>
</template>

<script>
export default {
    props:['model'],
    data(){
        return {
            name:'tangxuke'
        }
    }
}
</script>
