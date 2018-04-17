<?php 

namespace AppBundle\Controller;

use \FOS\RestBundle\Controller\ControllerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Symfony\Component\HttpKernel\Log\DebugLoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use \AppBundle\Exception\ValidationException;
use \FOS\RestBundle\View\View;

class ExceptionController extends Controller
{
    use ControllerTrait;

    /**
     * Action called every time an unhandled exception occures
     *
     * @param Request $request
     * @param [type] $exception
     * @param DebugLoggerInterface $logger
     * @return View
     */
    public function showAction(Request $request, $exception, DebugLoggerInterface $logger = null)
    {
        if ($exception instanceof ValidationException) {
            return $this->getView($exception->getStatusCode(), json_decode($exception->getMessage(), true));
        }

        if ($exception instanceof \HttpException) {
            return $this->getView($exception->getStatusCode(), $exception->getMessage());
        }

        return $this->getView(null, $exception->getMessage()??'Unexpected error occured');
    }

    /**
     * Helper function that return formatted View
     *
     * @param integer|null $statusCode
     * @param [type] $message
     * @return View
     */
    private function getView(?int $statusCode, $message): View
    {
        $data=[
            'code' => $statusCode ?? 500,
            'message' => $message
        ];

        return $this->view($data, $statusCode ?? 500);
    }
}
