import { Menu, MenuItem, MenuItemGroup, SubMenu } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
/**
 * Aside 组件
 */
export default defineComponent({
  name: 'Aside',
  setup() {
    const defaultOpenKeys = ref(['0']);
    const defaultSelectedKeys = ref(['0_1']);

    return () => (
      <Menu
        default-open-keys={defaultOpenKeys.value}
        default-selected-keys={defaultSelectedKeys.value}
      >
        <MenuItem key="0_0_0" data-obj="1">
          Menu 1
        </MenuItem>
        <SubMenu key="0">
          <MenuItem key="0_0">Menu 1</MenuItem>
          <MenuItem key="0_1">Menu 2</MenuItem>
          <MenuItem key="0_2" disabled>
            Menu 3
          </MenuItem>
        </SubMenu>
        <SubMenu key="1">
          <MenuItem key="1_0">Menu 1</MenuItem>
          <MenuItem key="1_1">Menu 2</MenuItem>
          <MenuItem key="1_2">Menu 3</MenuItem>
        </SubMenu>
        <SubMenu key="2">
          <MenuItemGroup title="Menu Group 1">
            <MenuItem key="2_0">Menu 1</MenuItem>
            <MenuItem key="2_1">Menu 2</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="Menu Group 2">
            <MenuItem key="2_2">Menu 3</MenuItem>
            <MenuItem key="2_3">Menu 4</MenuItem>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  }
});
