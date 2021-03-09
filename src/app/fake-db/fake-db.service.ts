import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ScrumboardFakeDb } from './scrumboard';



export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,
        };
    }
}
