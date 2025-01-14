<template>
  <div class="message-container">
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
    </div>
    <div class="table">
      <Table
        :columns="columns"
        :data-source="searchResult"
        :pagination="{
          current: pageNo,
          pageSize: pageSize,
          total: totalCount,
          onChange: handleChange,
        }"
        :bordered="true"
      >
      </Table>
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
  Badge,
} from "ant-design-vue";

import { getURL } from "@/utils/getUrl";
import { userSearch } from "@/service/user_manage/list";
import { freezeUser, unFreezeUser } from "@/service/user_manage/freeze";
import { formatUTC } from "@/utils/format";

interface SearchUser {
  nickName: string;
  username: string;
  email: string;
}

export interface SearchResult {
  username: string;
  nick_name: string;
  head_pic: string;
  email: string;
  create_time: string;
  update_time: string;
  phone?: number;
  is_frozen?: boolean;
  id?: number;
}

let searchResult = ref<SearchResult[]>([]);

const columns: TableColumnsType<SearchResult> = [
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
  },
  {
    title: "昵称",
    dataIndex: "nick_name",
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
  },
  {
    title: "头像",
    dataIndex: "head_pic",
    align: "center",
    customRender: (value) => {
      if (value.text !== "NULL") {
        return h(Image, { src: getURL(value.text), width: "50px" });
      }
    },
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    customRender: (value) => formatUTC(value.record.create_time),
    align: "center",
  },
  {
    title: "上次修改时间",
    dataIndex: "update_time",
    customRender: (value) => formatUTC(value.record.update_time),
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "is_frozen",
    align: "center",
    customRender: (value) => {
      if (value.record.is_frozen) {
        return h(Badge, { status: "error", text: "已冻结" });
      }
    },
  },
  {
    title: "操作",
    align: "center",
    customRender: (value) => {
      let id = value.record.id;

      return value.record.is_frozen
        ? h(Button, {
            onClick: () => {
              handleunFreeze(id as number);
            },
            innerHTML: "解冻",
            type: "link",
          })
        : h(Button, {
            onClick: () => {
              handleFreeze(id as number);
            },
            innerHTML: "冻结",
            type: "link",
          });
    },
  },
];

const searchUser = ref({} as SearchUser);

let pageNo = 1;
let pageSize = 10;

const setPage = (newPageNo: number, newPageSize: number) => {
  pageNo = newPageNo;
  pageSize = newPageSize;
};

async function handleFreeze(id: number) {
  const res = await freezeUser(id);

  const { code, data } = res.data;

  if (code === 201 || code === 200) {
    message.success("成功冻结");
    searchBtn(searchUser.value);
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}

async function handleunFreeze(id: number) {
  const res = await unFreezeUser(id);

  const { code, data } = res.data;

  if (code === 201 || code === 200) {
    message.success("成功解冻");
    searchBtn(searchUser.value);
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}

let totalCount = ref(15);

function handleChange(pageNo: number, pageSize: number) {
  setPage(pageNo, pageSize);
  searchBtn(searchUser.value);
}

async function searchBtn(values: SearchUser) {
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
    totalCount.value = data.totalCount;
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}
searchBtn(searchUser.value);
</script>

<style scoped lang="less">
.message-container {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .search {
    margin-left: 20%;
    margin-bottom: 20px;
  }
}
</style>
