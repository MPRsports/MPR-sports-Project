import "./AnnotationGuidePage.css";
import mergeImage from "../assets/merge.png";
import pitchPointsImage from "../assets/PitchPoints.png";
import equipasImage from "../assets/Equipas.png";
import outsidePropImage from "../assets/outsideProp.png";
import pontosCampoImage from "../assets/pontosCampo.png";
import ballOptionsImage from "../assets/ballOptions.png";
import occlusionPlayerImage from "../assets/occlusionPlayer.png";
import ocludedImage from "../assets/ocluded.png";
import refereeImage from "../assets/ref.png";

export function AnnotationGuidePage() {
  return (
    <div className="guidePage">
      <header className="guideHeader">
        <div className="headerTag">v1.0 - Annotation Guidelines</div>
        <h1>
          Guia de <span>Anotação</span>
          <br />
          MPR Sports
        </h1>
        <p className="headerSub">Instrucoes normalizadas para anotacao de videos de futebol no CVAT. Todos os anotadores devem seguir este documento.</p>
      </header>

      <div className="pipeline">
        <div className="stage stage1">
          <div className="stageNum">1</div>
          <div>
            <div className="stageTitle">Annotation</div>
            <div className="stageDesc">Criacao das caixas e pontos</div>
          </div>
        </div>
        <div className="stage stage2">
          <div className="stageNum">2</div>
          <div>
            <div className="stageTitle">Validation</div>
            <div className="stageDesc">Revisao por segundo anotador</div>
          </div>
        </div>
        <div className="stage stage3">
          <div className="stageNum">3</div>
          <div>
            <div className="stageTitle">Acceptance</div>
            <div className="stageDesc">Aprovacao final e export</div>
          </div>
        </div>
      </div>

      <main>
        <section>
          <div className="sectionHeader">
            <span className="sectionNum">01</span>
            <h2>Labels e Ferramentas</h2>
          </div>

          <div className="labelsGrid">
            <div className="labelCard green">
              <div className="labelName">player</div>
              <div className="labelTool">Rectangle</div>
              <div className="labelDesc">Jogadores de campo de ambas as equipas</div>
            </div>
            <div className="labelCard blue">
              <div className="labelName">goalkeeper</div>
              <div className="labelTool">Rectangle</div>
              <div className="labelDesc">Guarda-redes</div>
            </div>
            <div className="labelCard orange">
              <div className="labelName">referee</div>
              <div className="labelTool">Rectangle</div>
              <div className="labelDesc">Principal, auxiliares e 4.o arbitro</div>
            </div>
            <div className="labelCard yellow">
              <div className="labelName">ball</div>
              <div className="labelTool">Rectangle</div>
              <div className="labelDesc">Bola</div>
            </div>
            <div className="labelCard purple">
              <div className="labelName">pitch</div>
              <div className="labelTool">Skeleton</div>
              <div className="labelDesc">Pontos de intersecao das linhas do campo</div>
            </div>
          </div>

          <div className="callout calloutInfo">
            <span className="calloutIcon">[i]</span>
            <span>
              Todos os labels <strong>exceto pitch</strong> sao feitos com a ferramenta <strong>Rectangle</strong>. O pitch usa o <strong>Skeleton</strong> com pontos predefinidos.
            </span>
          </div>
        </section>

        <section>
          <div className="sectionHeader">
            <span className="sectionNum">02</span>
            <h2>Regras das Bounding Boxes</h2>
          </div>

          <div className="detailBlock">
            <h3>
              <span className="dot dotGreen" />
              player / goalkeeper
            </h3>
            <ul className="rules">
              <li>A caixa deve envolver o corpo inteiro: do topo da cabeca ate a ponta das chuteiras.</li>
              <li>Sem espaco vazio extra, mas sem cortar partes do corpo (maos, pes, cabeça e bandeirola do sr arbitro auxiliar).</li>
              <li>Se apenas parte do jogador é visivel na borda da frame, a caixa vai ate ao limite da imagem.</li>
            </ul>
            <table className="attrTable spaced">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valores</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Team</strong>
                  </td>
                  <td>
                    <span className="tag tagGreen">A</span> <span className="tag tagBlue">B</span>
                  </td>
                  <td className="muted">Equipa A = equipa da casa (titular). Equipa B = Visitante.</td>
                </tr>
                <tr>
                  <td>
                    <strong>Occlusion</strong>
                  </td>
                  <td>
                    <span className="tag tagRed">True</span> <span className="tag tagGreen">False</span>
                  </td>
                  <td className="muted">Marcar True se mais de 25% do corpo estiver tapado por outro jogador.</td>
                </tr>
              </tbody>
            </table>
            <div className="imageRow">
              <figure className="stepImageCard imageRowItem">
                <img className="stepImage imageThumb imageTiny" src={occlusionPlayerImage} alt="Exemplo de occlusion player" loading="lazy" />
                <figcaption className="stepImageCaption">Exemplo de oclusao parcial do jogador.</figcaption>
              </figure>
              <figure className="stepImageCard imageRowItem imageRowItemCentered">
                <img className="stepImage imageThumb" src={ocludedImage} alt="Exemplo de jogador ocluido" loading="lazy" />
                <figcaption className="stepImageCaption">Ferramenta para ativar a oclusao (Occluded) no CVAT.</figcaption>
              </figure>
            </div>
          </div>

          <div className="detailBlock">
            <h3>
              <span className="dot dotOrange" />
              referee
            </h3>
            <table className="attrTable">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valores</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Role</strong>
                  </td>
                  <td>
                    <span className="tag tagOrange">main</span> <span className="tag tagBlue">assistant</span> <span className="tag tagYellow">fourth</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <figure className="stepImageCard">
              <img className="stepImage imageThumb" src={refereeImage} alt="Referencia de opcoes de referee no CVAT" loading="lazy" />
              <figcaption className="stepImageCaption">Referencia visual para anotacao de referee.</figcaption>
            </figure>
          </div>

          <div className="detailBlock">
            <h3>
              <span className="dot dotYellow" />
              ball
            </h3>
            <ul className="rules">
              <li>A caixa deve ser sempre um quadrado perfeito ajustado a bola.</li>
              <li>Se a bola estiver com motion blur (rasto de movimento), a caixa envolve todo o rasto.</li>
              <li>Se a bola estiver 100% tapada por um jogador - nao anotar.</li>
              <li>Se estiver pelo menos 10% visivel - anotar.</li>
            </ul>
            <table className="attrTable spaced">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valores</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Position</strong>
                  </td>
                  <td>
                    <span className="tag tagGreen">on ground</span> <span className="tag tagBlue">on air</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <figure className="stepImageCard">
              <img className="stepImage imageSmall" src={ballOptionsImage} alt="Opcoes de Ball Position: on ground e on air" loading="lazy" />
              <figcaption className="stepImageCaption">Referencia visual para o atributo Ball Position.</figcaption>
            </figure>
          </div>

          <div className="detailBlock">
            <h3>
              <span className="dot dotPurple" />
              pitch - Pontos do Campo (Skeleton)
            </h3>
            <ul className="rules">
              <li>Usar a ferramenta Skeleton no CVAT.</li>
              <li>Cada ponto deve corresponder a uma intersecao das linhas do campo.</li>
              <li>Os pontos que nao estao visiveis na frame devem ser ocultados com a tecla (Q) - Outside property.</li>
            </ul>

            <figure className="stepImageCard">
              <img className="stepImage stepImageWide" src={pontosCampoImage} alt="Mapa de pontos do campo para o Skeleton" loading="lazy" />
              <figcaption className="stepImageCaption">Mapa geral dos pontos do campo.</figcaption>
            </figure>

            <figure className="stepImageCard">
              <img className="stepImage" src={pitchPointsImage} alt="Referencia de Pitch Points para o Skeleton no CVAT" loading="lazy" />
              <figcaption className="stepImageCaption">Referencia visual dos pitch points para anotacao do Skeleton.</figcaption>
            </figure>

            <div className="callout calloutInfo spacedTop">
              <span className="calloutIcon">[tip]</span>
              <span>
                O Skeleton do pitch <strong>nao usa Track</strong>. Anotar frame a frame ou por interpolacao manual, ao contrario dos outros labels.
              </span>
            </div>
          </div>
        </section>

        <section>
          <div className="sectionHeader">
            <span className="sectionNum">03</span>
            <h2>Fluxo de Trabalho no CVAT</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="stepCircle">1</div>
              <div className="stepBody">
                <div className="stepTitle">Usar sempre o modo Track</div>
                <div className="stepText">
                  Todos os labels devem usar o modo <strong>Track</strong> no CVAT. Isto mantem o mesmo ID ao longo do video.
                </div>
              </div>
            </div>
            <div className="step">
              <div className="stepCircle">2</div>
              <div className="stepBody">
                <div className="stepTitle">Anotar por saltos de 10-15 frames</div>
                <div className="stepText">
                  Anotar o objeto na <strong>Frame X</strong>. Avancar 10-15 frames. Se o movimento for linear, ajustar na <strong>Frame Y</strong>. O CVAT interpola automaticamente.
                </div>
              </div>
            </div>
            <div className="step">
              <div className="stepCircle">3</div>
              <div className="stepBody">
                <div className="stepTitle">Jogador sai de cena - Outside Property</div>
                <div className="stepText">
                  Quando um jogador sai da frame ou fica completamente invisivel, usar a propriedade <strong>Outside</strong> no track (tecla <strong>O</strong>).
                </div>
                <figure className="stepImageCard">
                  <img className="stepImage imageSmall" src={outsidePropImage} alt="Exemplo da Outside Property no CVAT" loading="lazy" />
                  <figcaption className="stepImageCaption">Outside Property no CVAT para pausar o track sem perder o ID.</figcaption>
                </figure>
                <div className="callout calloutWarning">
                  <span className="calloutIcon">[!]</span>
                  <span>
                    Nao apagar o track. Usar sempre <strong>Outside</strong> para pausar e manter o ID do jogador. E depois dar Merge com novo track.
                  </span>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="stepCircle">4</div>
              <div className="stepBody">
                <div className="stepTitle">Jogador volta a cena - Merge de Tracks</div>
                <div className="stepText">a) Criar nova caixa no frame onde ele volta a ser visivel. b) Ir ao ultimo frame antes do Outside. c) Selecionar track original + novo track. d) Executar o Merge para manter o mesmo ID.</div>
                <figure className="stepImageCard">
                  <img className="stepImage" src={mergeImage} alt="Atalho no CVAT para Merge shapes/tracks [M]" loading="lazy" />
                  <figcaption className="stepImageCaption">Exemplo no CVAT: opcao de Merge shapes/tracks [M].</figcaption>
                </figure>
                <div className="callout calloutSuccess">
                  <span className="calloutIcon">[OK]</span>
                  <span>Apos o merge, o jogador mantem o mesmo ID em todo o video.</span>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="stepCircle">5</div>
              <div className="stepBody">
                <div className="stepTitle">Jogador sai definitivamente - Terminar o Track</div>
                <div className="stepText">Se o jogador sair e nao voltar, terminar o track no ultimo frame em que estava visivel.</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="sectionHeader">
            <span className="sectionNum">04</span>
            <h2>Oclusao e Casos Limite</h2>
          </div>

          <div className="casesGrid">
            <div className="caseCard">
              <h4>Oclusao Parcial (&gt;25%)</h4>
              <p>Se mais de 25% do corpo estiver tapado por outro jogador, marcar Occlusion = True.</p>
            </div>
            <div className="caseCard">
              <h4>Oclusao Total (100%)</h4>
              <p>Se o jogador estiver invisivel, usar Outside e depois Merge quando voltar.</p>
            </div>
            <div className="caseCard">
              <h4>Jogador na borda da frame</h4>
              <p>Se apenas parte do corpo e visivel, anotar a parte visivel ate ao bordo da frame.</p>
            </div>
            <div className="caseCard">
              <h4>Grupo de jogadores</h4>
              <p>Separar caixas individualmente quando possivel; se nao der, usar Occlusion = True.</p>
            </div>
            <div className="caseCard">
              <h4>Fora do campo</h4>
              <p>Banco de suplentes, publico ou equipa tecnica nao sao anotados.</p>
            </div>
            <div className="caseCard">
              <h4>Bola parcialmente visivel</h4>
              <p>Se pelo menos 10% da bola estiver visivel, anotar. Se 100% coberta, nao anotar.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="sectionHeader">
            <span className="sectionNum">05</span>
            <h2>Principios Gerais</h2>
          </div>
          <div className="detailBlock">
            <ul className="rules">
              <li>
                <strong>Consistencia</strong>: Todos os anotadores seguem este guia da mesma forma.
              </li>
              <li>
                <strong>Precisao</strong>: As caixas devem ser o mais justas possivel.
              </li>
              <li>
                <strong>Identidade</strong>: O mesmo jogador mantem o mesmo ID enquanto estiver no campo.
              </li>
              <li>
                <strong>Equipa A</strong> = equipa da casa. <strong>Equipa B</strong> = equipa visitante.
              </li>
              <li>Em caso de duvida, consultar o supervisor/CEO Brito antes de anotar incorretamente.</li>
            </ul>
          </div>
          <figure className="stepImageCard">
            <img className="stepImage" src={equipasImage} alt="Referencia visual das equipas para anotacao" loading="lazy" />
            <figcaption className="stepImageCaption">Equipas: referencia para distinguir Equipa A e Equipa B.</figcaption>
          </figure>
        </section>
      </main>

      <footer className="guideFooter">
        <span>MPR SPORTS - Annotation Guidelines v1.0</span>
        <span>CVAT | Track Mode | 3-Stage Pipeline</span>
      </footer>
    </div>
  );
}
