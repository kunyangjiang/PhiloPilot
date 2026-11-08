import { DAOZANG_JINGSHANG as M } from '../assets';
import '../gr4/gr4.css';
import './cn2.css';

// 三 · after the paragraph on how the course cites the canons. One page of a
// dated, institution-held print of the received text, with its record
// (public/media/cn2/SOURCES.md). The caption says only what the page shows.
export default function DaozangPage() {
  if (!M.available) return null;
  return (
    <figure className="md g4-fig c2-page">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>"通行本"长什么样。</b>这是明正统十年（1445）刊《正统道藏》所收《墨子》卷十的第一页，现藏中国国家图书馆。右起第一行是"墨子卷之十"，第二行是"經上第四十"，第三行开头的"故所得而後成也"，就是本部分后面要读的"故，所得而后成也"；左起第二行"體之無序而最前者也"，是第五部分所引"端"的定义。
        </p>
        <p>
          可以看到，刻本把一条条经文接连刻下来，没有分条，也没有标点：哪里是一条的结束，要靠后人判断。这一页上与"正"相应的地方刻作形近的"缶"（"同長以缶相盡也""日中缶南也"），维基文库本作"正"。这正是正文所说的情况：今天读到的分条、断句和许多字，都经过了后人的整理。至于这一页能不能说明"两栏误抄为一栏"的问题，单看一页是看不出来的。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            国家图书馆记录
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
