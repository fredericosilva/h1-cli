Formatowanie wyjścia
====================

Domyślnym formatowaniem wyjścia jest format JSON. Możesz zmodyfikować to zachowanie poprzez argument ``--output {table,tsv,list,json}``.

Jeżeli chcesz - możesz to zachowanie poprzez zmienną środowiskową ``H1_DEFAULT_OUTPUT``. Wykorzystaj w tym celu polecenie::

    $ export H1_DEFAULT_OUTPUT=table;

Jeżeli chcesz - możesz ustawić to zachowanie jako domyślne na platformie Linux poprzez::

    $ echo -e "\nexport H1_DEFAULT_OUTPUT=table;" >> ~/.bashrc

Dostępna jest także kontrola formatowania wyjścia JSON z wykorzystaniem JMSEPath_, co pozwala dokonać różnorodnych przekształceń, filtrowań, aby uzyskać format wynikowy zgodny z oczekiwaniami.

Przykładowo::

    $ h1 vm list --output "[?state=='Running'].{Name: name, Image: sourceImage.name}"

    [
      {
        "Name": "host1",
        "Image": "image - ubuntu-16-04"
      },
      {
        "Name": "host2",
        "Image": "image - ubuntu-16-04"
      }
    ]


 .. todo::

    Zweryfikować poprawność polecenia

.. _JMSEPath: http://jmespath.org