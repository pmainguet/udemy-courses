function [X_norm, mu, sigma] = featureNormalize(X)
%FEATURENORMALIZE Normalizes the features in X 
%   FEATURENORMALI

% ====================== YOUR CODE HERE ======================
% Instructions: First, for each feature dimension, compute the mean
%               ofZE(X) returns a normalized version of X where
%   the mean value of each feature is 0 and the standard deviation
%   is 1. This is often a good preprocessing step to do when
%   working with learning algorithms.

% You need to set these values correctly
X_norm = X;
mu = zeros(1, size(X, 2));
sigma = zeros(1, size(X, 2));

for i=1:size(X,2)
  %mu(i)=(X(:,i)'*ones(1,length(X(:,i)))')/length(X(:,i));
  mu(i)=mean(X(:,i));
  %sigma(i)=max(X(:,i))-min(X(:,i));
  sigma(i)=std(X(:,i));
  for j=1:size(X,1)
    X_norm(j,i)=(X(j,i)-mu(i))/sigma(i);
  end
end

%disp(mu);
%disp(sigma);
%disp(min(X(:,1)));
%disp(X_norm);
%               the feature and subtract it from the dataset,
%               storing the mean value in mu. Next, compute the 
%               standard deviation of each feature and divide
%               each feature by it's standard deviation, storing
%               the standard deviation in sigma. 
%
%               Note that X is a matrix where each column is a 
%               feature and each row is an example. You need 
%               to perform the normalization separately for 
%               each feature. 
%
% Hint: You might find the 'mean' and 'std' functions useful.
%       









% ============================================================

end
