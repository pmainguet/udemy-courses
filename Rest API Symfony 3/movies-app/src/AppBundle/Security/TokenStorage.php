<?php

namespace AppBundle\Security;

use \Predis\Client;

class TokenStorage
{
    const KEY_SUFFIX = '-token';

    private $redisClient;

    public function __construct(Client $redisClient)
    {
        $this->redisClient=$redisClient;
    }

    /**
     * Undocumented function
     *
     * @param string $username
     * @param string $token
     * @return void
     */
    public function storeToken(string $username, string $token):void
    {
        $this->redisClient->set($username.self::KEY_SUFFIX, $token);
        $this->redisClient->expire($username.self::KEY_SUFFIX, 3600);
    }

    /**
     * Undocumented function
     *
     * @param string $username
     * @return void
     */
    public function invalidateToken(string $username):void
    {
        $this->redisClient->del($username.self::KEY_SUFFIX);
    }

    public function isTokenValid(string $username, string $token): bool
    {
        return $this->redisClient->get($username.self::KEY_SUFFIX)===$token;
    }
}
