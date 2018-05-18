<?php

namespace CarBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;
use CarBundle\Service\DataChecker;
use Doctrine\ORM\EntityManager;

class AbcCheckCars2Command extends Command
{
    protected $carChecker;
    protected $manager;

    public function __construct(DataChecker $carChecker, EntityManager $manager)
    {
        $this->carChecker=$carChecker;
        $this->manager=$manager;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('abc:check-cars2')
            ->setDescription('...')
            ->addArgument('format', InputArgument::OPTIONAL, 'Progress format')
            ->addOption('option', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $carRepository = $this->manager->getRepository('CarBundle:Car');
        $cars=$carRepository->findAll();
        $bar = new ProgressBar($output, count($cars));
        $argument = $input->getArgument('format');
        $bar->setFormat($argument);
        $bar->start();

        

        foreach ($cars as $car) {
            $this->carChecker->checkCar($car);
            $bar->advance();
        }
        $bar->finish();
    }
}
