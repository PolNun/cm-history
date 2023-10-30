import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CommitsService} from './commits.service';

describe('CommitsService', () => {
  let service: CommitsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommitsService]
    });

    service = TestBed.inject(CommitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch commit history', () => {
    const mockCommits = [
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/e87caa99aa8acb765b2d758a1f135bd47a74398b",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-29T03:41:43Z",
        "message": "Creando servicio para obtener commits"
      },
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/1b7ec01408f78f98a11731e56306ce47ecc61a8e",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-29T03:06:27Z",
        "message": "Definiendo modulo de github en proyecto de frontend"
      },
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/1a65b1607fe73424d0ae28c111e72302aec3bc96",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-29T00:32:23Z",
        "message": "Mejorando el metodo getCommitHistory y agregando path parameters al endpoint para obtener commits"
      },
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/7c2a776b6fc3d8be35a038f81f50e0ac539061a8",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-29T00:01:35Z",
        "message": "Creando endpoint para obtener historial de commits por owner y repo"
      },
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/75c9a45102c5375d22d95e98fbd689864a8bf706",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-28T22:50:38Z",
        "message": "Creando servicio para trabajar con API de GitHub"
      },
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/a3fb37afea5bca69f4f5852dfdcd58e60171963f",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-28T22:22:57Z",
        "message": "Agregando proyecto git-cm-history-backend (NestJS) al repositorio"
      },
      {
        "url": "https://github.com/PolNun/git-cm-history/commit/ed1ec5091873d8fb5e337d3c5d2e8cf3cf83e404",
        "authorName": "Pablo Nunez",
        "authorEmail": "polnunez@outlook.com",
        "date": "2023-10-28T21:21:52Z",
        "message": "Initial commit"
      }
    ];

    service.getCommitHistory('polnun', 'git-cm-history', 'main').subscribe(commits => {
      expect(commits.length).toBe(2);
      expect(commits).toEqual(mockCommits);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/github/polnun/git-cm-history?sha=main');
    expect(req.request.method).toBe('GET');
    req.flush(mockCommits);
  });
});
