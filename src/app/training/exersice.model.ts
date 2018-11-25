export interface Exersice {
    id: string;
    name: string;
    durarion: number;
    calories: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}
