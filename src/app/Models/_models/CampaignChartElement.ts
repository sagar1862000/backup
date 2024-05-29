import { CampaignFlowItem } from './CampaignFlowItem';

export interface CampaignChartElement {
    x: number;
    y: number;
    item: CampaignFlowItem;
    parent_id?: CampaignChartElement;
    childrenCount: number;
    category: number;
    connection?: string;
    isSelected: boolean;
    shadowFilter: string;
    dragOffset?: { x: number; y: number };
}
