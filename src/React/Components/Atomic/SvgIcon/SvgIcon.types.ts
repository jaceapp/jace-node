type IconName = 'group' | 'list' | 'emoji' | 'lock' | 'hash';
export interface Props {
    type: IconName;
    fill?: string;
};