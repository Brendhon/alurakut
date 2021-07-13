import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  const { user } = props;
  return (
    <Box>
      <img
        alt=""
        src={`https://github.com/${user}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @
          {user}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'brendhon';
  const pessoasFavoritas = [
    'ItaloRez',
    'GabrielGSD',
    'VanessaSwerts',
    'itmoura',
    'Leo18ss',
    'alexanderaugusto',
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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade (
              {pessoasFavoritas.length}
              )
            </h2>

            <ul>
              {pessoasFavoritas.map((person) => (
                <li>
                  <a href={`/users/${person}`} key={person}>
                    <img alt={`Usuário ${person}`} src={`https://github.com/${person}.png`} />
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
