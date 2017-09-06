h1-cli
======

h1-cli jest konsolowym narzędziem przeznaczonym do zarządzania infrastrukturą chmury HyperOne. Możesz go wykorzystywać zarówno do własnych prac administracyjnych, jak również podczas tworzenia  skryptów automatyzujących.

Co to chmura HyperOne?
----------------------

 .. todo::

    Wprowadzenie opisu zgodnego z polityką marketingową.

Przegląd funkcjonalności
------------------------

* kontrola wszystkich zasobów udostępnianych przez panel administracyjny, w szczególności:

  * zmiana konfiguracji maszyn wirtualnych - ich tworzenie, wyłączanie i kasowanie,
  * manipulacja adresami IP - ich przepinanie, modyfikacja rekordu PTR,
  * modyfikowanie dysków - utworzenie, odłączenie / dołączenie od wirtualnej maszyny, rozszerzenie, wykonanie migawki.

* różnorodne formy uwierzytelniania - zob. :ref:`authentication`
* wybór formatu wyjścia, w celu wykorzystania go w dodatkowych narzędziach.

Instalacja
----------

Instalacja zasadniczo ogranicza się pobrania wykonywalnej kopii oprogramowania, która jest dostępna w zakładce "`Releases`_" repozytorium.

W środowisku systemu Linux
##############################

Uruchom dostarczony plik binarny po nadaniu uprawnień wykonywalnych:

.. code-block:: console

    $ chmod +x h1_client.bin
    $ ./h1_client.bin

Aplikacja powinna działać poprawnie bez instalacji dodatkowych bibliotek / pakietów.

Jeżeli zamierzasz z oprogramowania stale korzystać możesz dokonać instalacja dla użytkownika lub na poziomie systemu.

Instalacja dla użytkownika może zostać przeprowadzona poprzez:

.. code-block:: console

   $ cp h1_client.bin ~/.local/bin/h1
   $ h1

Instalacja na poziomie sytemu może zostać przeprowadzona poprzez:

.. code-block:: console

   $ cp h1_client.bin /usr/local/bin/h1
   $ h1

W środowisku systemu Windows
################################

 .. todo::

    Wprowadzenie dla systemu Windows wymaga opracowania z uwzględnieniem specyfiki platformy.

W środowisku systemu macOS
##############################

 .. todo::

    Wprowadzenie dla systemu macOS wymaga opracowania z uwzględnieniem specyfiki platformy.

Użycie
------

Polecenia zbudowane są z następujących składowych:

.. code-block:: console

    $ h1 [grupa] polecenie [[argument] ...]

Struktura ta powtarza się w wszystkich poleceniach aplikacji.

Aby rozpocząć prace powinieneś zalogować się poprzez polecenie:

.. code-block:: console

    $ h1 login {{adres_email}}

Zostaniesz poproszony o wprowadzenie hasła::

    ? Password: ********************

Po poprawnym logowaniu otrzymasz komunikat o uzyskaniu klucza API dla sesji::

    info: You successfully logged and stored your apiKey in config file

Dane uwierzytelniające zostały zapisane na platformie Linux / macOS w ``$HOME/.h1conf``. Należy zapewnić poufność tych plików.

.. todo:

    Gdzie zapisują się dane na platformie Windows?
    Czy poprawna ścieżka jest dla platformy macOS?

Jeżeli wykorzystujesz więcej niż 1 tenant musisz dokonać wyboru aktywnie używanego poprzez pobranie identyfikatora właściwego:

.. code-block:: console

    $ h1 tenant list --output table

Następnie zatwierdzenia tego wyboru:

.. code-block:: console

    $ h1 tenant select {{tenant_id}}


Utworzenie wirtualnej maszyny
-----------------------------

Poniżej przedstawiona jest przykładowa sesja przedstawiająca podstawową akcje - utworzenie wirtualnej maszyny:

.. code-block:: console
   :emphasize-lines: 11,16,21-27,48,86

   $ h1 vm list --output table
   ID                        NAME                       FLAVOUR    STATE    PROCESSING
   58d8598f773f4c75b4a8b0d9  list.ptr.jawne.info.pl     a1.micro   Running  false
   58bb8ceb57f1a0b3a239294c  wiki.ptr.jawne.info.pl     a1.medium  Running  false
   58c57a62f059b95da6a4acce  ada.ptr.jawne.info.pl      a1.small   Running  false
   5962144c3ad55647634e8cea  zyta.ptr.jawne.info.pl     a1.micro   Running  false
   58bb8b5657f1a0b3a2392932  urszula.ptr.jawne.info.pl  a1.medium  Running  false

   $ h1 credentials list --output table
   ID                        TYPE  CREATED
   59b0369284e468875f8a59d1  ssh   2017-09-06T17:55:30.361Z

   $ h1 image list  --recommend --output table
   ID                        NAME                          DISTRO  RELEASE   CODENAME      ARCH  FILESIZE  CREATED                   STATE   PROCESSING
   59af4432bd02f5a8ef9cd694  Debian GNU/Linux 8 (jessie)   debian  8.9       jessie        x64   2         2017-09-06T00:41:22.376Z  Online  false
   59af47f1bd02f5a8ef9cd700  Debian GNU/Linux 9 (stretch)  debian  9.1       stretch       x64   2         2017-09-06T00:57:21.960Z  Online  false
   59af4c57bd02f5a8ef9cd76c  Ubuntu 16.04 (xenial xerus)   ubuntu  16.04     xenial xerus  x64   2         2017-09-06T01:16:07.787Z  Online  false
   59af5115bd02f5a8ef9cd7c3  Ubuntu 17.04 (zesty zapus)    ubuntu  17.04     zesty zapus   x64   2         2017-09-06T01:36:21.100Z  Online  false
   59af3cefbd02f5a8ef9cd5f2  CentOS 6                      centos  6.9       core          x64   2         2017-09-06T00:10:23.672Z  Online  false
   59af4086bd02f5a8ef9cd635  CentOS 7                      centos  7.3.1611  core          x64   2         2017-09-06T00:25:42.763Z  Online  false
   $ $ h1 vm create --name vm-tutorial \
                    --sshkey 59b0369284e468875f8a59d1 \
                    --image 59af47f1bd02f5a8ef9cd700 \
                    --type a1.micro \
                    --os-disk-name vm-tutorial-0 \
                    --os-disk-type archive \
                    --os-disk-size 100
   {
     "_id": "59b03a23bd02f5a8ef9cda25",
     "name": "vm-tutorial",
     "flavour": "a1.micro",
     "billingTenant": "587707232a57b6fd80f04bc1",
     "services": [
       {
         "type": "flavour",
         "name": "a1.micro",
         "data": {
           "vm": {
             "memory": 1,
             "cpu": 1,
             "maxNetAdp": 1,
             "maxhdd": 2,
             "maxIPv4": 1
           },
           "disk": [],
           "netadp": [
             {
               "service": "561e7e30a8cfd461e469ad18"
             }
           ]
         },
         "billing": "59b03a5d35e0d43b439e9236",
         "sourceService": "58ac4185ae24388c3083cb29",
         "billingEnd": "2017-09-06T18:11:41.499Z",
         "_id": "59b03a5d35e0d43b439e9237",
         "id": "59b03a5d35e0d43b439e9237"
       }
     ],
     "modifiedBy": "**CUT**",
     "modifiedOn": "2017-09-06T18:10:43.806Z",
     "createdOn": "2017-09-06T18:10:43.803Z",
     "createdBy": "**CUT**",
     "created": true,
     "processing": false,
     "sourceImage": {
       "_id": "59af47f1bd02f5a8ef9cd700",
       "name": "Debian GNU/Linux 9 (stretch)"
     },
     "queue": [
       {
         "_id": "59b03a23bd02f5a8ef9cda26",
         "name": "create",
         "createdBy": "**CUT**",
         "queued": "2017-09-06T18:10:43.806Z",
         "state": "finished"
       }
     ],
     "cpu": 1,
     "memory": 1,
     "state": "Running"
   }

   $ h1 vm list --output table
   ID                        NAME                       FLAVOUR    STATE    PROCESSING
   58d8598f773f4c75b4a8b0d9  list.ptr.jawne.info.pl     a1.micro   Running  false
   59b03a23bd02f5a8ef9cda25  vm-tutorial                a1.micro   Running  false
   58bb8ceb57f1a0b3a239294c  wiki.ptr.jawne.info.pl     a1.medium  Running  false
   58c57a62f059b95da6a4acce  ada.ptr.jawne.info.pl      a1.small   Running  false
   5962144c3ad55647634e8cea  zyta.ptr.jawne.info.pl     a1.micro   Running  false
   58bb8b5657f1a0b3a2392932  urszula.ptr.jawne.info.pl  a1.medium  Running  false

Zgłaszanie problemów i uwag
---------------------------

Jeśli napotkasz jakiekolwiek błędy z narzędziem, proszę zgłosić problem poprzez system zgłoszeń w panelu administracyjnym lub zakładkę "Issues" w `repozytorium`_.

.. _Releases: https://github.com/hyperonecom/h1-cli/releases/latest
.. _repozytorium: https://github.com/hyperonecom/h1-cli