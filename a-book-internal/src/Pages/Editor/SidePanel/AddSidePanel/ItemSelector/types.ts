
export type ItemSelectorProps = {
    itemGroups: ItemGroup[]
}

export type ItemGroup = {
    key?: string;
} & ItemGroupProps

export type ItemGroupProps = {
    label: string;
    items: Item[]
}

export type Item = {
    content: React.ReactElement,
    key: string;
}

export type ItemProps = {
    content: React.ReactElement,
    key: string;
}