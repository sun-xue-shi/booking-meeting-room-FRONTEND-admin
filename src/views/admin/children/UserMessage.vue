<template>
  <div class="container">
    <div class="search">
      <Form :model="searchUser" @finish="searchBtn" layout="inline">
        <FormItem label="用户名" name="username">
          <Input :maxlength="20" v-model:value="searchUser.username" />
        </FormItem>

        <FormItem label="昵称" name="nickName">
          <Input :maxlength="20" v-model:value="searchUser.nickName" />
        </FormItem>

        <FormItem
          label="邮箱"
          name="email"
          :rules="{
            message: '请输入正确的邮箱格式',
            type: 'email',
          }"
        >
          <Input :maxlength="20" v-model:value="searchUser.email" />
        </FormItem>

        <FormItem>
          <Button class="btn" type="primary" html-type="submit"> 搜索 </Button>
        </FormItem>
      </Form>
      <div class="table">
        <Table
          :columns="columns"
          align="right"
          :data-source="searchResult"
          :pagination="{
            current: pageConfig.pageNo,
            pageSize: pageConfig.pageSize,
            onChange: handleChange,
          }"
          :bordered="true"
        >
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import {
  Form,
  FormItem,
  Input,
  Button,
  type TableColumnsType,
  Table,
  message,
  Image,
} from "ant-design-vue";
import { userSearch } from "@/service/admin/list";
import { getURL } from "@/utils/getUrl";

interface SearchUser {
  nickName: string;
  username: string;
  email: string;
}

interface SearchResult {
  username: string;
  nick_name: string;
  head_pic: string;
  email: string;
  create_time: string;
  phone?: number;
  is_frozen?: boolean;
  id?: number;
}

let searchResult = ref<SearchResult[]>([]);

const columns: TableColumnsType<SearchResult> = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "昵称",
    dataIndex: "nick_name",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "头像",
    dataIndex: "head_pic",
    customRender: (value) => {
      if (value.text !== "NULL") {
        return h(Image, { src: getURL(value.text), width: "50px" });
      }
    },
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
  },
  {
    title: "操作",
    customRender: (value) =>
      h("a", {
        href: "#",
        innerHTML: "冻结",
        onClick: handleFreeze(value.record.id),
      }),
  },
];

const searchUser = ref<SearchUser>({
  nickName: "",
  username: "",
  email: "",
});

const pageConfig = ref({
  pageNo: 1,
  pageSize: 10,
});

function handleFreeze() {}

function handleChange(pageNo: number, pageSize: number) {
  setpage;
}

async function searchBtn(
  values: SearchUser,
  pageNo = pageConfig.value.pageNo,
  pageSize = pageConfig.value.pageSize
) {
  const res = await userSearch(
    values.username,
    values.nickName,
    values.email,
    pageNo,
    pageSize
  );

  const { data } = res.data;
  if (res.status === 200 || res.status === 201) {
    searchResult.value = data.users;
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}
searchBtn(searchUser as unknown as SearchUser);
</script>

<style scoped lang="less">
.container {
  padding: 20px;

  .table {
    margin-top: 20px;
  }
}
</style>
