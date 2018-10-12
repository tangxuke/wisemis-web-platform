<template>
    <Row>
        <div is="Col" :span="8">
            <Row>
                <ButtonGroup>
                    <Button @click="AppendSameLevelNode">添加同级</Button>
                    <Button @click="AppendChildLevelNode">添加下级</Button>
                    <Button>删除</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Tree :data="data1" @on-select-change="onSelectChange" ref="tree"></Tree>
            </Row>
        </div>
        <div is="Col" :span="16">
            <Tabs v-model="selectedTab">
                <TabPane name="tag" label="tag">
                    <p>
                        是否文本节点：<i-switch v-model="isTextNode"/>
                    </p>
                    <p>
                        <Form>
                            <FormItem label="文本内容" v-if="isTextNode"><Input v-model="text" type="textarea" autosize/></FormItem>
                            <FormItem label="标签类型" v-if="!isTextNode">
                                <Select :transfer="true" v-model="tagType">
                                    <Option value="component">自定义组件</Option>
                                    <Option value="html">原生标签</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="标签名称" v-if="!isTextNode">
                                <Select  :transfer="true" v-if="tagType==='html'" v-model="tag">
                                    <Option value="p">p</Option>
                                    <Option value="div">div</Option>
                                </Select>
                                <Select :transfer="true" v-if="tagType!=='html'" v-model="tag">
                                    <Option value="Row">Row</Option>
                                    <Option value="Col">Col</Option>
                                    <Option value="MyForm">MyForm</Option>
                                    <Option value="MyTable">MyTable</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </p>
                </TabPane>
                <TabPane name="props" label="props" v-if="!isTextNode && tag && tagType==='component'">
                    <Row>
                        <div is="Col" :span="12">
                            <Form :label-width="50">
                                <FormItem label="属性名"><Input/></FormItem>
                                <FormItem label="属性值"><Input type="textarea" autosize /></FormItem>
                                <FormItem>
                                    <Button type="success">应用</Button>
                                    <Button style="margin-left:5px;">清除</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div is="Col" :span="12" style="padding:0 10px;">
                            <Table></Table>
                        </div>
                    </Row>
                </TabPane>
                <TabPane name="on" label="on" v-if="!isTextNode && tag"></TabPane>
                <TabPane name="attrs" label="attrs" v-if="!isTextNode && tag && tagType==='html'"></TabPane>
            </Tabs>
            <Button type="success" @click="Apply">应用</Button>
        </div>
    </Row>
</template>

<script src="./script.js">

</script>
