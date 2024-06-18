import { FlowItem } from './FlowItem';

export interface ChartElement {
    x: number;
    y: number;
    item: FlowItem;
    parent?: ChartElement;
    childrenCount: number;
    category: number;
    connection?: string;
    isSelected: boolean;
    shadowFilter: string;
}
