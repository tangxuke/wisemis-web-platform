
<template>
    <d2-container>
        关于...
        <p>
            {{v}}
        </p>
        <Button @click="v='ddd'">test</Button>
    </d2-container>
</template>

<script>






export default {
    data(){
        return {
            v:'test'
        }
    }
}
</script>
