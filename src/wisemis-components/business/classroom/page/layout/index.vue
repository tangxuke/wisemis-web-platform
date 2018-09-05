<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">座位布局</p>
            <div>
                <!--图例-->
                <Row>
                    <div></div>
                </Row>
                <!--讲台-->
                <!--课桌-->
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                rows:5,
                cols:5
            }
        }
    }
</script>
