
export type ItemSelectorProps = {
    itemGroups: ItemGroup[];
}

export type ItemGroup = {
    key: string;
} & Pick<ItemGroupProps, 'items' | 'label'>

export type ItemGroupProps = {
    label: string;
    items: Item[];
    expanded: boolean;
    onToggle: () => unknown
}

export type Item = {
    content: React.ReactElement,
    key: string;
}

export type ItemProps = {
    content: React.ReactElement,
    key: string;
}