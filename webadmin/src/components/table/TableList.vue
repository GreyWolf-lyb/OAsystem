<template>
  <el-table
    :data="tableData"
    empty-text="暂无数据"
    class="el_tab_alage"
    min-height="400"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    @select-all="handleSelectAll"
    @select="handleSelect"
  >
    <el-table-column
      v-for="(index, item) in tableLabel"
      fit
      :key="item"
      :prop="index.list"
      :label="index.label"
      :type="index.type"
      :width="index.width"
      align="center"
    >
      <template slot-scope="scope">
        <template v-if="scope.row[index.list] === '待反馈'">
          <span class="blue">{{scope.row[index.list]}}</span>
        </template>
        <template v-else-if="scope.row[index.list] === '已反馈'">
          <span class="orange">{{scope.row[index.list]}}</span>
        </template>
        <template v-else-if="scope.row[index.list] === '已退回'">
          <span class="red">{{scope.row[index.list]}}</span>
        </template>
        <template v-else-if="scope.row[index.list] === '已终止'">
          <span class="hui">{{scope.row[index.list]}}</span>
        </template>
        <template v-else-if="scope.row[index.list] === '待用章审批'">
          <span class="blue">{{scope.row[index.list]}}</span>
        </template>
        <template v-else>
          <span>{{scope.row[index.list]}}</span>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      fit
      align="center"
      :width="tableOption.width"
      :label="tableOption.label"
      v-if="tableOption.value === 0"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-for="(value, item) in tableOption.options"
          :key="item"
          :type="value.type"
          :plain="value.State"
          :icon="value.icon"
          :disabled="value.disabled"
          @click.native.prevent="value.method(scope.row, scope)"
        >{{value.label}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fit
      align="center"
      :label="tableOption.label"
      :width="tableOption.width"
      v-if="tableOption.value === 2"
    >
      <template slot-scope="scope">
        <template v-for="(value, item) in tableOption.options">
          <template v-if="item === 0 || scope.row.id !== 'admin'">
            <el-button
              size="mini"
              :type="value.type"
              :plain="value.State"
              :icon="value.icon"
              :key="item"
              :disabled="value.disabled"
              @click.native.prevent="value.method(scope.row, scope)"
            >{{value.label}}</el-button>
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column fit align="center" :label="tableOption.label" v-if="tableOption.value === 1">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-for="(value, item) in tableOption.options"
          :type="value.type"
          :plain="value.State"
          :icon="value.icon"
          :v-if="item === 0 && scope.row._status !== '0' || item === 1 && scope.row._status === '0' || item === 2"
          :key="item"
          :disabled="value.disabled"
          @click.native.prevent="value.method(scope.row, scope)"
        >{{value.label}}</el-button>
      </template>
    </el-table-column>
    <el-table-column fit align="center" :label="tableOption.label" v-if="tableOption.value === 8">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-for="(value, item) in tableOption.options"
          :type="value.type"
          :plain="value.State"
          :icon="value.icon"
          :key="item"
          :disabled="item === 0 && scope.row.isAvailability === '0'"
          @click.native.prevent="value.method(scope.row, scope)"
        >{{value.label}}</el-button>
      </template>
    </el-table-column>
    <el-table-column fit align="center" :label="tableOption.label" v-if="tableOption.value === 3">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-for="(value, item) in tableOption.options"
          :type="value.type"
          :plain="value.State"
          :icon="value.icon"
          v-if="item === 0 || item === 1 && scope.row.id !== 'admin' || item === 2 && scope.row.id !== 'admin'"
          :key="item"
          :disabled="value.disabled"
          @click.native.prevent="value.method(scope.row, scope)"
        >{{value.label}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      Select: "",
    };
  },

  props: {
    tableData: {
      type: Array,
      default: () => {},
    },
    tableLabel: {
      type: Array,
      default: () => {},
    },
    tableOption: {
      type: Object,
      default: () => {},
    },
    tableStyle: {
      type: Array,
      default: () => {},
    },
  },

  methods: {
    nitialization_check(Select) {
      let that = this;
      that.Select = Select;
      that.$refs.multipleTable.toggleRowSelection(Select, true);
    },

    handleSelectionChange(val) {
      this.$emit("onHandleSelectionChange", val);
    },

    handleSelectAll(val, row) {
      this.$emit("onHandleSelectAll", val, row);
    },

    handleSelect(val, row) {
      this.$emit("onHandleSelect", row);
    },
  },
};
</script>

<style scoped lang="scss">
.red {
  color: red;
}
.blue {
  color: blue;
  // cursor: pointer
}
.hui {
  color: #999999;
}
.orange {
  color: green;
}
.el_tab_alage {
  width: 98%;
  border: 1px solid #f0f0f0;
  margin: {
    left: 1%;
    bottom: 20px;
    top: 10px;
  }
  .el-table__row {
    @media screen and (max-width: 1020px) {
      .el-button {
        margin: {
          top: 0px !important;
          left: 10px !important;
          bottom: 0px !important;
          right: 0px !important;
        }
      }
    }
    @media screen and (max-width: 1360px) {
      .el-button + .el-button {
        margin: {
          top: 0px !important;
          bottom: 0px !important;
          right: 0px !important;
        }
      }
    }
  }
}
</style>
