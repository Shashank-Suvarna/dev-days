import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

type PublisherSelectionRow = {
    id: number;
    name: string;
};

function mapPublisher(row: PublisherSelectionRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/** All publishers ordered by name. */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select(publisherSelection)
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map(mapPublisher);
}
