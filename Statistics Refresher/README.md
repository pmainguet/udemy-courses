# Statistics for Business Analytics and Data Science A-Z

* Link: https://www.udemy.com/data-statistics
* Markdown formula: https://goessner.github.io/markdown-it-texmath/index.html
* Katex formula: http://copyasmarkup.com/katex/function-support.html

## Summary:

* You want to find the probability of an event occuring:
    * To determine the probability of doing something based on history
    * To determine if something as changed

* You basically work with the Central Limit Theorem which states that the sample distribution (distribution of the mean's sample) of any distribution is always a normal distribution and its mean and std deviation is linked to the initial distribution mean and std.

* To determine if something has changed, you form the null hypothesis that nothing changed, and try to contradict it, based on a random sample, that must show very unlikely probability to happen given the hypothesis. Depending on the data provided you can use:
    * z-test or t-test (Student) method
    * Rejection region method (similar)
    * Proposition testing method

* To determine if an hypothesis is right or wrong, based on a percentage of confidence / rejection zone
    * you select randomly a sample and get the measure
    * you state the null hypothesis (the opposite of what you want to prove) and the alternative hypothesis
    * you define a rejection rule (95% percent confidence ie 5% statistical significance, ...)
    * You select the test to use:
        * You know the whole population std - Z-TEST / REJECTION ZONE TESTING
            * You have less than 30 observations
                * You know the population standard deviation
                    * You run a z-test
                * You don't know the population standard deviation
                    * You run a t-test
            * You have more than 30 observations
                * You run a z-test or a t-test, it does not matter
        * You don't know the whole population std - PROPORTION TESTING
            * You estimate the mean and the std of the population based on p and (1-p)
    * In any case, you end up using the CTL to calculate the z-value (normalized value) of the sample and then test the assumption based on z-score table

* Questions:
    * Probability of doing something based on history
        * Given the mean and std of a shipment history, you can derive the probability of being able to ship of boxes given a maximum load: derive the maximum weight of a box, then calculate the z value of this max weight and look up on the z-table the probability of it being in the distribution.
        * Given the mean and std of earnings, you can calculate the probability of making a loss or a win: normalize loss/win value and look in z-table to get the probability of making it
    * Validating hypothesis
        * Always the same mechanics: unvalidating the opposite by finding a contradiction through a sample (very low chance to have pick up the sample if the hypothesis is true)
        * We want to:
            * test if a metric has increased or decreased => we do a one tail test
            * test if a metric has changed => we do a two tailed test (divide by 2 the statistical significance)
        * Given mean AND std of a feature in the whole population, we want to test hypothesis of an increase by taking a random sample of more than 30 elements => CTL / z-table
        * Given ONLY mean of a feature in the whole population, we want to test hypothesis of an increase by taking a random sample of more than 30 elements => Proportion testing => tests to see if we can apply, we calculate sigma based on p and 1-p / CTL / z-table
        * Given ONLY mean of a feature in the whole population, we want to test hypothesis of an increase by taking a random sample of less than 30 elements => Student test => we get sample mean and sigma => we calculate t value and use t table

## Jargon

* Statistical significance: in hypothesis testing, it is the threshold by which an event is considered very unlikely to happen and then the hypothesis can be confidently rejected
* Level of confidence: 1 - statistical significance. Correspond to the degree of confidence that we reject the hypothesis on 

## Distributions

* Continuous variable: data that can take any value (amount of money, ...)
* Discrete variable: data that can take only specific values(categories, age, ...)

### What is a distribution

* Probability Distribution: mathematical function that can be thought of as providing the probability of occurence of different possible outcomes in an experiment (ie: picking a random variable in our dataset)
* Discrete Variable - Distribution curves (bar chart) gives the probability of having someone aged xx for ex
* Continous Variable - Cannot tell the probability of a specific value is as it is always zero, but you can tell the probability of being in a range through integration (the probability function is called Probability Density Function (PDF) )

### Cantor's Diagonal Argument

* Continuous variables can take any values, an infinite number, how can it be ?
* There is an infinite number between any two natural number, actually the infinite of number between 0 and 1 is stronger than the infinite number of natural numbers (0,1,2,3...)
* Proof by absurd:
    * if there is no infinite number of values between 0 and 1, we can count them, ie we can assign a natural number to each of them
    * I then constrct a new value by choosing the nth digit as a complementary to the nth digit of sn 
    * By construction, the new value differs from each sn since their nth digit differs, hence the new value cannot occur in the enumeration
    * Then there is an infinite number of values between 0 and 1, or the set T is uncountable

### What is standard deviation

* Mean: average value that takes the data, value where the data is centered
* Variance / Std Dev: measure of the Spread of the data
    * Range: min and max
    * Variance: average of deviation to the mean $\mu$           
        $Var = \sigma² = \frac {(\sum_{i=1}^N x_i - \mu)² } {N}$
        (the fact that we use square instead of module is because it creates problem with more advanced calculus)
    * Standard Deviation : square root of variance, better than variance as it has the same unit as data (can add standard deviation to mean)
        $Std Dev = \sigma = \sqrt {Var} = \sqrt {\frac {(\sum_{i=1}^N x_i - \mu)² } {N}}$

### Normal Distribution

* $p(x) = \frac {1} {\sigma \sqrt{2\pi}}\epsilon^(-\frac{(x-\mu)^2}{2\sigma^2})$
* For a normal distribution, the probability of falling:
    * between $\mu$ and $\mu + \sigma$ is 34.1% (same for between $\mu$ and $\mu - \sigma$ )
    * between $\mu + \sigma$ and $\mu + 2\sigma$ is 13.6% (same for between $\mu - \sigma$ and $\mu - 2\sigma$ )
    * between $\mu + 2\sigma$ and $\mu + 3\sigma$ is 2.1% (same for between $\mu - 2\sigma$ and $\mu - 3\sigma$ )
    * above $\mu + 3\sigma$ is 0.1% (same for below $\mu - 3sigma$)

![Image](img/normaldistribution.png?raw=true)

* Normal distribution comes up a lot in the world (height of people, ...)

### Skewness (dissymétrie)

* Left or Right Skewed, you need to look to look at where the tail is (where the largest amount of data point is, not where the highest value is)

![Image](img/skewness.png?raw=true)

### Mean, Median, Mode

* Mean: average of values
* Median: value that exactly divides the dataset in two equal parts (in terms of number of data point)
    * you include duplicates.
    * If the median lies between to data point, the median is the average between those two data points.
    * Median are not as affected by outliers as the mean
* Mode: the maximum of the PDF for a continuous variable or the most frequent value for a discrete variable
* Left / Negative Skewed distribution: MEAn < MEDian < MODe
* Right / Positive Skewed distribution: Mean > Median > Mode

### HOMEWORK (in Google Sheets)

https://docs.google.com/spreadsheets/d/1DJzSdbp_nw4l73UhJZcBnEX0-EVCtprZEcz5a3Qi1Mk/edit?usp=sharing

* Use of NORMDIST formula to create the Normal Distribution Density Function
* Use of NORMINV to create a random dataset based on a Normal Distribution Density Function
* Use of FREQUENCY (as array function) to put data in bins and plot in a chart (instead of using a pivot table)
* See https://www.benlcollins.com/spreadsheets/histogram-in-google-sheets/
* WARNING: STDEV formula in Google Sheets calculate the Standard Deviation based on a sample, STDEV on the whole population

## Central Limit Theorem

### Populations and Samples - Parameters and Statistics

* Population is the whole set of events that you observe. It has Parameters such as size (N), mean ($\mu$), standard deviation ($\sigma$)
* A sample is a subset of the population, designed to help assess the parameters of the whole population. It doesn't have parameters but statistics: number of observation in your sample ($n$), mean ($\bar{x}$), standard deviation ($s$)

### Sampling Distribution

* Sometimes taking a sample is not going to give us the right insights in order to solve a business problem.
* Sampling Distribution: we take samples of the same size and we record the mean $\bar{x}$ for each of these samples, and we plot them to get the probability function of the sample means

![Image](img/populationsampling.png?raw=true)

### Central Limit Theorem

* Very useful when we are observing real-world events
* Central Limit theorem
        
        If you take enough samples, the sampling distribution (probability function of the sample means) will be a normal distribution, regardless of the kind of distribution you have in the population.

* Mean of sampling distribution = mean among population

$\mu_{\bar {x}} = \mu$

* Standard deviation of sampling distribution = standard deviation of the population divided by the square root of the SAMPLE SIZE

$\sigma_{\bar {x}} = \frac {\sigma} {\sqrt n}$

* When you increase the size of each sample, the sampling distribution is more a normal distribution that if the size of the sample is small

http://onlinestatbook.com/2/sampling_distributions/clt_demo.html

### Z-Score - Standard/Normal Score - Normalized Variable

* The Z-Score corresponds to the number of standard deviation by which the value of an observation is above the mean value of what is being observed.
* it is the normalized version of variable x

$Z = \frac {x-\mu} {\sigma}$

* With Z you will have a normal distribution centered around 0 and with a standard deviation of 1

![Image](img/zscore.png?raw=true)

* To find out what is the probability, you look at z-score tables http://www.z-table.com/
    * If we want to know that the probability of the normalized variable to be picked below 1.6 (ie the probability of x being observed at less than 1.6 standard deviation from the mean), p(z=1.6) = 0.9452
    * If we want to know the probability of the normalized variable to be between 0 and 1.6, p(0<x<1.6) = 0.9452 - 0.5 = 0.4452

### Hands On CLT - Analytics Challenge

* A client is asking to send 36 boxes but they don't know the weight
* From the history, we know that the average weight is 72 lbs and the standard deviation is 3 lb
* However we don't know the distribution of the parcel weights, or there's no way it follows a normal distribution, and we have to respect the maximum payload of the plane that we are using
* We know that if we take a Sampling Distribution (distribution of the means of the sample), its mean is equal to the mean of the distribution of the population and that its std is linked to the std of the population through sample size.
* The critical mass of a box is the plane capacity divideb by 36 boxes = 73 lb
* If we normalize this value (careful with sigma of the sampling distribution), we obtain 2.12 (ie the z-score lies within 2 std of the sampling distribution mean)
* looking at z-score table, we can say that there is a 98% chance that we will be able to ship the load

### HOMEWORK

* Team individual trade earnings can be approximated with a Laplace Distribution, with a mean of 95.7$ and a std of 1247 $. Team makes about 100 trades every week
    * What is a probability of your team making a loss in any given week
    * What is the probability of your team making over 20000$ in a given week

* Sampling distribution: if we take samples of 100 trades within the history of trades of our team, we know that it will follow a normal distribution with a mean = 95.7$ and a std of 1247/sqrt(100)=124.7
* The probability of making a loss, ie p(x<0) => we normalize Z = 0-95.7/124.7 = -0.77 => looking at the table we can tell 22.06%
* The probability of making over 20000$ per week, ie on average 200$ per trade, ie p(x>200) = 1 - p(x<200). Z = 200-95.7/124.7 => 0.836, ie 79.95 (p(z<0.836)). The probability of making over 20000$ per week is 20.05%

## Hypothesis Testing / Statistical Significance

### Test hypothesis with z-test

#### Steps

* Example: in 2015, millenials were watching 26.5 hours of TV a week with a standard deviation of 10hrs. Today you surveyed 50 millenials and found that they watch 24 hours of TV per week. Has the parameter decreased ?

* STEP 1: State the NULL hypothesis - we choose the completely opposite of what we want to check as our null hypothesis and try to contradict it.
    * $H_0$: It has not decreased, ie $\mu \geq 26.5$
* STEP 2: State the ALTERNATIVE hypothesis
    * $H_1$: It has decreased, ie $\mu \lt 26.5$
* STEP 3: We apply the CTL to determine how likely the null hypothesis is, to try to contradict it:
    * We want to reject all hypothesis in the most difficult circumstances: the hardest situation to prove that the null hypothesis is incorrect is when $\mu_\bar{x} = \mu = 26.5$ (smallest distance)
    * $\mu_\bar{x} = \mu = 26.5$
    * $\sigma_\bar{x} = \frac {\sigma} {\sqrt{50}} = 1.41
    * $\bar{x} = 24$
    * z = -1.77
    * p (z = -1.77) = 3.8% => there is a 3.8% chance that we picked a sample in this area, meaning ...
    * ... that if we set a threshold to 5%, it is very unlikely that the null hypothesis is correct. With a 95 percent confidence, we reject the null hypothesis and then conclude that with a 95% confidence, millenials today watch less TV than in 2015
    
#### Level of Statistical Significance

* P-value: probability of the result happening in our null hypothesis
* Statistical significance: P-value at which you feel that the null hypothesis is correct/incorrect (1%, 5%, 10%, ... )
* Percent Confidence: the % at which you reject the null hypothesis (inverse of statistical significance)

#### Hypothesis Testing Assumptions

* Sample is selected at random: the way to select should not be biased (select people based on their landline phone, that few people use now). Just increasing the sample size, does not solve bias problem.
* Observations are independent.
* The population's standard deviation is known OR the sample contains at least 30 observations
    * If we don't know the population standard deviation, we run a t-test instead of a z-test
    * If you have 30 observations, a t-distribution is very similar to a normal distribution, so you can perform either a z or a t test

### Test hypothesis with Rejection Region

* Similar to z-test
* Instead of going to the z-score table and finding the probability of having the value z (p(x=z)), we are going to find the 5% in the table to get the "boundary" of the rejection region, and see if our z-score is in this region.
* The advantage is that you can know by heart the "boundary"
    * 99% confidence => $z_crit = -2.33 / 2.33$
    * 95% confidence => $z_crit = -1.65 / 1.65$
    * 90% confidence => $z_crit = -1.29 / 1.29$
* Same assumptions apply

### Testing hypothesis with Proportion Testing

* Example: according to a 2016 survey, a staggering 58% of American households have tablets. Your manager has asked you to test the Hypothesis (with a 97% significance level) that only 58% of American homes have tablet devices. You surveyed 100 random households and found that 73 of them had tablets.

* H0: 58% of fewer households have tablets, ie p <= 58% (here p is proposition, not p-value) => we only test the worst case ie p = 58%
* H1: more than 58% of households have tablets, ie p > 58%
* Test:
    * if $n\bar{p} > 10$: 100*73% = 73 > 10
    * if $n\bar{q} = n(1-\bar{p}) > 10$: 100*27% > 10
    * If tests fail, increase the sample size until conditions are met
* The proposition testing method tells us that we can derive the mean and the std of the whole population with p and q:
    * $\mu = p$ = 0.58 (the mean of the population is equal to the tested proportion)
    * $\sigma = \sqrt {pq}$
* We then apply the CTL:
    * $\mu_{\bar{p}} = \mu = p$ = 0.58
    * We don't know the population sigma, but we assume based on previous formulat that $\sigma = \sqrt {pq}$ = 0.49
    * $\sigma_{\bar{p}} = \frac {\sigma} {\sqrt {n}}$ = 0.049 
    * $\bar{p}$ = 0.73
    * $z = \frac {\bar{p}-\mu_{\bar{p}}} {\sigma_{\bar{p}}}$ = 3.06
    * $z_score$ = 99,89% (left part of the distribution), but, since our H0 is p<=58%, this means that we are seeking for evidence to reject it and we are looking for the probability to obtain a value from the right (as z lays on the right side of the graph), ie 1-99,89%  = 0.11% < 5%, level of significance
    * We can reject H0 with a 95% confidence level: We found out that if p<58%, it is highly unlikely(less than 3%) to obtain a sample from that population where 73 out of 100 have tablets.

### HOMEWORK

* Spoon factory recently spent 10M$ upgrading equipment and processes in order to combat excessively high defects in manufacturing (23%) which were leading to high return rates from clients. You have been asked to prove (with a confidence level of 95%) that new equipment has improved the situation and that the number of defective spoons has decreased to under 18%. You have been supplied with a random sample of 150 spoons and found that 23 spoons have defects.
* Answer:
    * H0: defect rate is equal or above 18%
    * H1: defect rate is under 18%
    * We don't know the std of the whole population, we then use the Proportion Testing
    * Tests:
        * n$\bar{p}$ = 23 > 10
        * n(1-$\bar{p}$) = 77 > 10
    * $\mu_\bar{p} = \mu = p$ = 0.18
    * $\sigma = \sqrt {pq} = \sqrt {0.18*0.82}$ = 0.38
    * $\sigma_\bar{p} = \frac {0.38} {\sqrt {150}}$ = 0.38 / 12.2 = 0.031
    * $\bar{p}$ = 23/150 = 0.15
    * z = -0.86
    * z-score = 0.194 (left part of the graph)> 5% => there's not enough evidence to reject the null hypothesis
    * In this case:
        * you do more samples to get more evidence
        * or larger samples 

## Advanced Hypothesis Testing

### What it means when you cannot reject the Null hypothesis

* If you can't reject the null hypothesis (because you stand in the range of -/+ 2 standard deviation), you can't reject the alternative hypothesis either. We just don't have enough evidence.
* In this case you can only increase the size sample (make the distribution narrower) or multiplys the number of samples.

### Student's t-distribution

* When you try to make inferences about population from samples as small as three elements.
* It is very similar to the normal distribution

$f(t)= \frac {\Gamma(\frac{\nu+1}{2})} {\sqrt{\nu\pi} \Gamma(\frac{\nu}{2})}(1+\frac{t^2}{\nu})^{-\frac{\nu+1}{2}}$ 

![Image](img/tdistribution.png?raw=true)

* $\nu$ is the degree of freedom (integer): the size of your sample minus one
* t-distribution:
    * describes a sample, not the whole population (whereas the normal distribution was to describe the sample distribution)
    * has heavier tails: facilitates outliers for small samples, ie harder to reject the null hypothesis, ie harder to prove
    * converges to a normal distribution when the degree of freedom tends to infinity (when the sample size is around 30, we consider that it is already a normal distribution)
* You use a t-distribution (t-test) when:
    * Population standard deviation is unknown AND
    * The sample size is small (n<30)
    * $t=\frac{\bar{x}-\mu}{(\frac{s}{\sqrt{\nu}})}$
    * s is the sample standard deviation

#### t-tests

* It is recommended to walk 10000 steps a day to be healthy. You are wondering if on average Americans are meeting this recommendation. You surveyed 10 random people about how many steps each of them takes per day on average and got the following responses

        {7900, 8200, 11350, 10150, 8200, 9600, 6950, 6200, 8950, 8450}

* It's evident that within your sample on average respondents are taking less than 10000 steps. But can you infer the same for the whole population of America ?

* H0: The whole population takes more or exactly 10000 steps a day.
* H1: The whole population takes less than 10000 steps.
* We don't know the standard deviation of the whole population and the sample size is less than 30, so we use the t-test
    * $\mu = 10000$
    * $s = 1428.36$
    * $\bar{x}=8595$
    * $t=\frac{8595-10000}{\frac{1428.36}{\sqrt{10-1}}}$= -2.95
    * student table: http://www.sjsu.edu/faculty/gerstman/StatPrimer/t-table.pdf
    * How it works: you cannot pick the probability for the t-value, you say what level of confidence you want (95%) and you look at the corresponding column (for 1 tail test) and then the number of freedom as line, and then you look up for the t-value
    * Here the table gives a $t_{crit 0.95, \nu=9}$ = -/+1.833
    * As t < $\t_crit$, we can reject the null hypothesis

### 1-Tailed and 2-Tailed Tests

* 1 tail test: stating a null hypothesis, then we see where our sample falls in the sampling distribution and if it falls in the rejection region we reject the hypothesis
* 2 tail test:
    * you want to see if something changed, not the fact that a metric has increased or decreased, just that it has changed
    * you use it when you can not state with absolute confidence that the effect has to be on one side or the other (effect of a drug on attention span for example)
* the intuition would be that it is easier to run a 2 tail test than a 1 tail test
    * it is not the case in statistics, because you take your statistical significance of 5% and you split it in 2, so it is much harder to reject the null hypothesis
    * In a one tail test, you have prior knowledge what the effect will be (increasing or decreasing), in a 2 tail test you don't know so you test for both, and so it is harder to prove
    * To read: https://conversionxl.com/blog/one-tailed-vs-two-tailed-tests/

#### HOMEWORK

* You work at a large book store. Your manager believes that the colour of the store walls affects people's spending. Previously your store had red interior and customers were spending 57$ on average with a std dev of 20$. Now the walls are green and the mean spend of the random sample of 80 customers you selected is 62$. Has there been a significant (95% confidence) change in spend ?

* H0: there has been no change in spend, ie $\mu$ = 57
* H1: there has been a significant change in spend
* You know the whole population mean and std and the sample is bigger than 30, you can use the z-test
    * $\mu_{\bar{x}} = \mu = 57$
    * $\sigma_{\bar{x}} = \frac{\sigma}{\sqrt(n)}$ = 2.24
    * $z = \frac {62-57}{2.24}$ = 2.24
    * 2 methods:
        * p-value: $p(z)$ = 1 - 0.9871 = 1.29% < 2.5% (there is a 1.29% chance that we would have picked this sample)
        * Critical score for 97.5% reject: 1.96 < 2.24

### Warning about misuse and overuse of p-values

* Reading: https://www.nature.com/news/scientific-method-statistical-errors-1.14700
* When we use the p-value, we look is there is a change, but we don't look at the magnitude of the change. It is important to look as well as the confidence level and the magnitude of the effects.

### Pareto Principle

* The majority of the output (80%) of a system is closely attributed to a minority of the inputs (20%)
* 80/20 is not set is stone. Pareto principle only states that there is a huge disproportion between output and input size
* 1% internet participation: on collaborative website, traffic splits like that: 90% are just browsing, 9% are leaving comments or editing content, and 1% is actually active
* Inverse Pareto Principle: eliminate the 80% of inputs that only leads to 20% of outputs
* Ultimate Pareto Principle: if we iterate three times, only 1% of the input leads to 50% of the outputs

### Trends in Analytics

* Data= Trend (if any) + Outliers (if any) + Noise
* Baselining: extrapolating based on history, without improvement
* Forecasting: extrapolating based on history and improvement (a little more inclusive)