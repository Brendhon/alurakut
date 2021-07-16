import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBox } from '../src/components/ProfileRelations';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { shuffle } from '../src/utils/helpers.ts';

export default function Home() {
  const [followers, setFollowers] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const githubUser = 'brendhon';
  const favoritePeople = [
    { id: '438358u', name: 'ItaloRez', image: 'https://github.com/ItaloRez.png' },
    { id: '324234', name: 'GabrielGSD', image: 'https://github.com/GabrielGSD.png' },
    { id: '34521', name: 'VanessaSwerts', image: 'https://github.com/VanessaSwerts.png' },
    { id: '435464', name: 'itmoura', image: 'https://github.com/itmoura.png' },
    { id: '123134545', name: 'Leo18ss', image: 'https://github.com/Leo18ss.png' },
    { id: '1312323', name: 'alexanderaugusto', image: 'https://github.com/alexanderaugusto.png' },
  ];

  React.useEffect(() => {
    const headersGet = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: '58c451b25de3368f69e83ebb20cd49',
    };
    const queryGet = '{ allCommunities { id title imageUrl creatorSlug } }';

    // Buscando dados dos seguidores
    fetch('https://api.github.com/users/brendhon/followers')
      .then((resp) => resp.json())
      .then((resp) => setFollowers(shuffle(resp)));

    // API GraphQL - Buscando dados das comunidades
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: headersGet,
      body: JSON.stringify({ query: queryGet }),
    })
      .then((resp) => resp.json())
      .then((resp) => setComunidades(shuffle(resp.data.allCommunities)));
  }, []);

  function handleCriaComunidade(e) {
    e.preventDefault(); // Evitar o reload da página
    const formData = new FormData(e.target); // Pegando os dados do formulário

    // Criando objeto para salvar os dados do fomulário
    const comunidade = {
      title: formData.get('title'),
      imageUrl: formData.get('imageUrl'),
      creatorSlug: githubUser,
    };

    // Não salvar se os campos estiverem vazios
    if (comunidade.imageUrl && comunidade.title) {
      // Realizando a requisição no BFF criado para salvar os dados no DatoCMS
      fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comunidade),
      })
        .then(async (resp) => {
          const result = await resp.json();
          setComunidades([...comunidades, result.data]); // Setando os dados no estado
        });
    }
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
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
            <form onSubmit={(e) => handleCriaComunidade(e)}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="imageUrl"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>

              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>

        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
            link="https://github.com/"
            attrName="login"
            attrLink="login"
            attrImage="avatar_url"
          />

          <ProfileRelationsBox
            title="Comunidades"
            items={comunidades}
            link="/communities/"
            attrLink="id"
            attrName="title"
            attrImage="imageUrl"
          />

          <ProfileRelationsBox
            title="Pessoas da comunidade"
            items={favoritePeople}
            link="/users/"
            attrLink="name"
            attrName="name"
            attrImage="image"
          />
        </div>
      </MainGrid>
    </>
  );
}
