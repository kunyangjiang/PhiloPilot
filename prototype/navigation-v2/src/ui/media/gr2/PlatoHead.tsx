import { PLATO_HEAD as M } from '../assets';
import './gr2.css';

// 七 · after the reminder that Plato never speaks in his own name. One museum
// object, with its record (public/media/gr2/SOURCES.md). The caption says
// what it can and cannot show: a Roman copy made some four centuries after
// Plato's death; the attribution of its Greek model is reported, not checked.
export default function PlatoHead() {
  if (!M.available) return null;
  return (
    <figure className="md gr2-obj">
      <img src={M.src} width={M.width} height={M.height} alt={M.alt} loading="lazy" decoding="async" />
      <figcaption>
        <p>
          <b>后人怎样描绘柏拉图。</b>这尊大理石头像高约 34 厘米，出土于罗马的阿根廷广场（Largo Argentina）圣域，现藏罗马卡皮托利尼博物馆（inv. MC 1377）。按展览记录，它是公元一世纪的罗马作品，比柏拉图去世晚了大约四百年。它不是柏拉图生前的写照，至多是一件更早的希腊原作的罗马复制品：照片作者的说明把这一类型归于雕塑家西拉尼昂（Silanion）约公元前 370 年为学园所作的肖像，本课没有核对这一归属，也不能确定复制品与原作有多接近。
        </p>
        <p>
          它能说明的，是几百年后罗马人怎样记住并展示这位哲学家。它不能告诉我们柏拉图的思想。在对话中，柏拉图从不以自己的名义说话；这尊像和对话里那些说话的人物一样，都需要我们分清：这是谁的呈现。
        </p>
        <p className="md-note">
          {M.credit}{' '}
          <a href={M.url} target="_blank" rel="noreferrer">
            照片页面
          </a>
          {' · '}
          <a href={M.license} target="_blank" rel="noreferrer">
            CC BY 2.5
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
