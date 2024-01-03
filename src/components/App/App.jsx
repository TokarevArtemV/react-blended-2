import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Header, Section, Container, Text } from 'components';
import { Gallery, Todos, Phonebook } from 'tabs';

export const App = () => {
  return (
    <>
      <Header />

      <Section>
        <Container>
          <Tabs>
            <TabList>
              <Tab>
                <Text>Gallery</Text>
              </Tab>
              <Tab>
                <Text>Todos</Text>
              </Tab>
              <Tab>
                <Text>Phonebook</Text>
              </Tab>
            </TabList>

            <TabPanel>
              <Gallery />
            </TabPanel>

            <TabPanel>
              <Todos />
            </TabPanel>
            <TabPanel>
              <Phonebook />
            </TabPanel>
          </Tabs>
        </Container>
      </Section>
    </>
  );
};
