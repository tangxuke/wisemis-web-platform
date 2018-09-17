<template>
    <my-table :model="childModel" :eventhub="event"></my-table>
</template>

<script>
export default {
    props:['model','childModel','mainFields','childFields','eventhub'],
    computed:{
        event:function(){
            return this.eventhub || this;
        }
    },
    created:function(){
        //当点击主体表的行时
            this.event.$on(`ROW-DATA-${this.model}`,data=>{

                    let modelName=this.childModel;
                    let mainFields=this.mainFields;
                    let childFields=this.childFields;
                    let where=[];
                    let arrMainFields=mainFields.split(',');
                    let arrChildFields=childFields.split(',');
                    for(let i=0;i<arrMainFields.length;i++){
                        where.push(
                            {
                                key:arrChildFields[i],
                                value:data[arrMainFields[i]]
                            }
                        );
                    };
                    var data1={where};
                    this.event.$emit(`DATA-${modelName}`,data1);
                    this.event.$emit(`SET-DEFAULT-${modelName}`,where);

            });
    }
}
</script>
