import { Ng2VkService } from './virtual-keyboard.service';
import { TestBed } from '@angular/core/testing';

describe('Ng2VkService', () => {
    let service: Ng2VkService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Ng2VkService]
        });
        service = TestBed.get(Ng2VkService);
    });

    it('instance should be created without errors', () => {
        expect(service).toBeDefined();
        expect(service instanceof Ng2VkService).toBeTruthy();
    });

    it('keyPress$ should emit string value', () => {
        service.keyPress$.subscribe(event => {
            expect(typeof event).toBe('string');
            expect(event).toBe('test');
        });
        service.keyPress$.emit('test');
    });

    it('shift$ should emit boolean value', () => {
        service.shift$.subscribe(event => {
            expect(typeof event).toBe('boolean');
            expect(event).toBeTruthy();
        });
        service.shift$.emit(true);
    });

    it('alt$ should emit boolean value', () => {
        service.alt$.subscribe(event => {
            expect(typeof event).toBe('boolean');
            expect(event).toBeTruthy();
        });
        service.alt$.emit(true);
    });

    it('altShift$ should emit boolean value', () => {
        service.altShift$.subscribe(event => {
            expect(typeof event).toBe('boolean');
            expect(event).toBeTruthy();
        });
        service.altShift$.emit(true);
    });

    it('focus$ should emit void event', (done: DoneFn) => {
        service.focus$.subscribe(() => {
            done();
        });
        service.focus$.emit();
    });

    it('selection$ should emit string value', () => {
        service.selection$.subscribe(event => {
            expect(typeof event).toBe('string');
            expect(event).toBe('test');
        });
        service.selection$.emit('test');
    });
});
