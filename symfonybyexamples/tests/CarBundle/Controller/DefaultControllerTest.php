<?php

namespace CarBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertContains('Symfony 3.4.8', $client->getResponse()->getContent());
    }

    public function testOffer()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/our-cars');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertContains('Our offer', $client->getResponse()->getContent());

        $link = $crawler->filter('a:contains("Show details")')->eq(0)->link();
        $crawler = $client->click($link);
        $this->assertContains('Fiat - X1', $crawler->filter('h1')->text());
    }
}
