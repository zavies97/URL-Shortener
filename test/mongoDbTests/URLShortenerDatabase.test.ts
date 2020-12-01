import { dropDatabase, addURL, getOneUrl, getAllUrl } from './../../src/handlers/URLShortenerHandler';

dropDatabase();

describe('insert', () => {

  afterAll(async () => {
    dropDatabase();
  })

  it('should insert a new url', async () => {

    const mockUrl = {shortenedUrl: 'https://pbid.io/1bcu74yr', originalUrl: 'https://thisisnaexamplesite'};
    
    await addURL(mockUrl);

    const addedUrl = await getOneUrl(mockUrl);
    expect(addedUrl).toEqual(mockUrl);
  });

  it('should retrieve known url from db', async () => {

    const mockUrl = { shortenedUrl: 'https://pbid.io/1bcu74yr', originalUrl: 'https://thisisnaexamplesite'};

    const addedUrl = await getOneUrl(mockUrl);

    expect(addedUrl.shortenedUrl).toEqual(mockUrl.shortenedUrl);
  })

  it('should retrieve all urls from db', async () => {

    const newMockUrl = {
        shortenedUrl: 'https://pbid.io/nfdu76fv',
        originalUrl: 'https://secondexampleurl'
    }    

    await addURL(newMockUrl);

    const getAllUrls = await getAllUrl();

    expect(getAllUrls).toHaveLength(2);

    expect(getAllUrls[1].shortenedUrl).toEqual(newMockUrl.shortenedUrl);

  })
});