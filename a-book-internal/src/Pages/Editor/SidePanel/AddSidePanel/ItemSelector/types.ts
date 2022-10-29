
export type ItemSelectorProps<ITEM_KEY extends string, GROUP_KEY extends string> = {
    itemGroups: ItemGroup<ITEM_KEY, GROUP_KEY>[];
    onItemSelect: (itemKey: ITEM_KEY) => unknown;
    selected: ITEM_KEY | null;
}

export type ItemGroup<ITEM_KEY extends string, GROUP_KEY extends string> = {
    key: GROUP_KEY;
} & Pick<ItemGroupProps<ITEM_KEY>, 'items' | 'label'>

export type ItemGroupProps<ITEM_KEY extends string> = {
    label: string;
    items: Item<ITEM_KEY>[];
    expanded: boolean;
    selected: ITEM_KEY | null,
    onItemSelect: (item: ITEM_KEY) => unknown
    onToggle: () => unknown
}

export type Item<ITEM_KEY extends string> = {
    content: React.ReactElement,
    key: ITEM_KEY;
}

export type ItemProps<ITEM_KEY extends string> = Item<ITEM_KEY> & {
    selected: boolean,
    onSelect: () => unknown
}