import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.user}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "brendhon";
  const pessoasFavoritas = [
    "ItaloRez",
    "GabrielGSD",
    "VanessaSwerts",
    "itmoura",
    "Leo18ss",
    "alexanderaugusto",
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar user={githubUser} />
        </div>

        <div className="welcomeArea">
          <Box>
            
            <h1 className="title">
            Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />

          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((person) => (
                <li>
                  <a href={`/users/${person}`} key={person}>
                    <img src={`https://github.com/${person}.png`} />
                    <span>{person}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
